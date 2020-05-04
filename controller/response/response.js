const  successResponse=(res,data)=>{
    if(data)
    {
    return res.status(200).json({ 
        success:true,
        data:data 
    })
}

else{
    return res.status(200).json({ 
        success:true
    })
}
}
const errorResponse=(error,res)=>{
     return res.status(400).json({
        success:false,
        error:error
    })
}
module.exports={successResponse,errorResponse}

