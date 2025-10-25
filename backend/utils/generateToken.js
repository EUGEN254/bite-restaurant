import jwt from 'jsonwebtoken'


const genrateToken = (user) => {
    return jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

}

export default genrateToken;