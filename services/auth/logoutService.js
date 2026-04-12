

module.exports = async(userId) => {
    if(!userId ) throw new Error("user id is missing")
  

    
 return {message:"logged out successfully",userId}

}