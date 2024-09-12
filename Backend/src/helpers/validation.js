exports.validation=(require_fileds , data)=>{
    const error = {};
    for( let i of require_fileds){
        if(!data[i]){
            error[i] =`${i} is required`;
        }
    }
    return error;
}

exports.validEmail = (email)=>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}