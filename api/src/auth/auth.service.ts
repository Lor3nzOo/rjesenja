import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UserDto} from "../dto/user.dto";
import * as b from 'bcrypt'
import * as c from 'crypto'

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
    async Registracija(dto: UserDto) {
        const { korisnickoIme, lozinka } = dto

        const userFound = await this.prisma.user.findUnique({
            where: {
                username: korisnickoIme
            }
        })

        if (userFound) {
            throw new BadRequestException('Korisničko ime već postoji!')
        }

        const hash = await b.hash(lozinka, 10)
        const user = await this.prisma.user.create({
            data: {
                username: korisnickoIme,
                hash,
                session: c.randomUUID()
            }
        })

        return user ? 'Uspješno ste se registrirali!' : 'Dogodila se greška!'
    }

    async Prijava(dto: UserDto, res) {
        const { korisnickoIme, lozinka } = dto

        const userFound = await this.prisma.user.findUnique({
            where: {
                username: korisnickoIme
            }
        })
        if (!userFound) {
            throw new BadRequestException('Krivi pristupni podatci!')
        }
        if (await b.compare(lozinka, userFound.hash)) {
            const session = c.randomUUID()
            await this.prisma.user.update({
                where: {
                    username: korisnickoIme
                },
                data: {
                    session
                }
            })
            res.cookie('session', session)
            res.send('Uspjesno ste se logirali!')
        } else {
            throw new BadRequestException('Krivi pristupni podatci!')
        }
    }

    async Session(req) {
        const session = req.cookies['session']

        if (session) {
            const user = await this.prisma.user.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })
            if (user) {
                return {
                    username: user.username,
                    statusCode: 200
                }
            } else {
                throw new BadRequestException('Nema aktivne sesije')
            }
        } else {
            throw new BadRequestException('Nema aktivne sesije')
        }
    }

    async Username(dto, req) {
        const session = req.cookies['session']
        const { username, newUsername } = dto

        if (session) {
            const user = await this.prisma.user.findFirst({
                where: {
                    // @ts-ignore
                    session
                },
                select: {
                    username: true
                }
            })
            if (user) {
                if (username === user.username) {
                    const newUser = await this.prisma.user.update({
                        where: {
                            username
                        },
                        data: {
                            username: newUsername
                        }
                    })
                    if (newUser) {
                        return 'Uspiješno promijenjeno korisničko ime!'
                    }
                } else {
                    throw new BadRequestException('Dogodila se greška!')
                }
            } else {
                throw new BadRequestException('Dogodila se greška!')
            }
        } else {
            throw new BadRequestException('Dogodila se greška!')
        }
    }
}
