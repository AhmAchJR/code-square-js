
export const loggingMiddle = (req , res , next)=>{
    console.log(req.body);
    console.log(Date.now());
    next()
}

export default loggingMiddle