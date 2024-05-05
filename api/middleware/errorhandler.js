import express from 'express';

var errorhandler=(status,message)=>{
      var err=new Error();
      err.status=status;
      err.message=message;
      return err;
};
export default errorhandler;