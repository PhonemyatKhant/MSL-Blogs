export const test = (req, res) => {
    res.json('Api is working')
}
export const updateUser = async (req, res, next) => {
    console.log(req.user );
}