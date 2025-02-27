import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

// const prisma = new PrismaClient();

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});


export const uploadFiletoS3=async(file:any)=>{
    
    const fileKey = `${uuidv4()}.${file.mimetype.split("/")[1]}`;
    const command=new PutObjectCommand({
     
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileKey, 
      Body: file.buffer,
      ContentType: file.mimetype,
      
    })

    try{
     const res=await s3.send(command)
     const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
     
    return imageUrl;
    // return res

    }
    catch(err){
        return null;
    }
}



export const imageUploadController=async (
    req: Request,
    res: Response
  ): Promise<void>=>{
  const file=req.file
  try{
    const response=await uploadFiletoS3(file)
    res.send(response)
  }
  catch(err){
    res.send(err)
  }
  
}