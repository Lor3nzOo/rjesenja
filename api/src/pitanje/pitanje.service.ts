import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class PitanjeService {
    constructor(private readonly prisma: PrismaService) {}

    async all() {
        const pitanja = await this.prisma.pitanje.findMany({
            select: {
                comments: {
                    select: {
                        content: true,
                        id: true,
                        pitanjeId: true,
                        userId: true,
                        //@ts-ignore
                        createdAt: true,
                        user: {
                            select: {
                                username: true
                            }
                        }
                    }
                },
                username: true,
                content: true,
                name: true,
                id: true,
                createdAt: true,
                imageUrl: true
            }
        })
        return pitanja
    }
    async newPitanje(req, dto, file) {
        const session = req.cookies['session']
        const { name, content } = dto

        if (session) {
            const user = await this.prisma.user.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })
            if (user) {
                const newPitanje = await this.prisma.pitanje.create({
                    data: {
                        name,
                        content,
                        userId: user.id,
                        username: user.username,
                        imageUrl: file.filename
                    }
                })
                if (newPitanje) {
                    return newPitanje
                }
            } else {
                throw new BadRequestException('Nema aktivne sesije')
            }
        } else {
            throw new BadRequestException('Nema aktivne sesije')
        }
    }

    async Comment(req, dto) {
        const session = req.cookies['session']
        const { pitanjeId, content } = dto

        if (session) {
            const user = await this.prisma.user.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })
            if (user) {
                const newComment = await this.prisma.comment.create({
                    data: {
                        content,
                        userId: user.id,
                        pitanjeId
                    }
                })
                if (newComment) {
                    return 'Komentar je uspješno postavljen!'
                }
            } else {
                throw new BadRequestException('Nema aktivne sesije')
            }
        } else {
            throw new BadRequestException('Nema aktivne sesije')
        }
    }

    async Me(req) {
        const session = req.cookies['session']

        if (session) {
            const user = await this.prisma.user.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })
            if (user) {
                const myPitanja = await this.prisma.pitanje.findMany({
                    where: {
                        userId: user.id
                    }
                })
                return myPitanja
            } else {
                throw new BadRequestException('Nema aktivne sesije')
            }
        } else {
            throw new BadRequestException('Nema aktivne sesije')
        }
    }

    async Del(req, dto) {
        const session = req.cookies['session']
        const { pitanjeId } = dto

        if (session) {
            const user = await this.prisma.user.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })
            if (user) {
                const deleteComments = await this.prisma.comment.deleteMany({
                    where: {
                        pitanjeId
                    },
                })
                const deletedPitanje = await this.prisma.pitanje.delete({
                    where: {
                        id: pitanjeId
                    },
                })
                if (deletedPitanje) {
                    return deletedPitanje
                } else {
                    throw new BadRequestException('Dogodila se greška!')
                }
            } else {
                throw new BadRequestException('Nema aktivne sesije')
            }
        } else {
            throw new BadRequestException('Nema aktivne sesije')
        }
    }

    async delComment(req, dto) {
        const session = req.cookies['session']
        const { commentId } = dto

        if (session) {
            const user = await this.prisma.user.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })
            if (user) {
                const deletedComment = await this.prisma.comment.delete({
                    where: {
                        id: commentId
                    }
                })
                if (deletedComment) {
                    return deletedComment
                } else {
                    throw new BadRequestException('Dogodila se greška!')
                }
            } else {
                throw new BadRequestException('Nema aktivne sesije')
            }
        } else {
            throw new BadRequestException('Nema aktivne sesije')
        }
    }
}
