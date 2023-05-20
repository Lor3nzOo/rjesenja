export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = file.originalname.split('.')[1];
    function makeid(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    callback(null, `${makeid(20)}.${fileExtName}`);
};