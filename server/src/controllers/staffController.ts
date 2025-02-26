import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStaffsController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const searchQuery = req.query.search as string || '';
      const pageQuery = req.query.page as string || '1';
      const page=Number(pageQuery) || 1
      const pageSize=10
      const skip=(page-1)*pageSize

      const [staffs,totalCount] = await Promise.all([
        await prisma.staff.findMany(
        {
          where: {
            username: {
              contains: searchQuery, // Use `contains` to search for matching category names
              mode: 'insensitive',   // Case-insensitive search
            },
          },
          skip: skip,
          take: pageSize,
        }
      ),
      await prisma.staff.count(
        {
          where: {
            username: {
              contains: searchQuery, // Use `contains` to search for matching category names
              mode: 'insensitive',   // Case-insensitive search
            },
          },
        }
      )
    ])
      
      const totalPages = Math.ceil(totalCount / pageSize)
      res.json({staffs,totalPages});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving staffs" });
    }
  };

  export const createStaffInNotExistController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { cognitoId, name, address, phone, email, username } = req.body;
      console.log(req.body);
  
      // Check if the cognitoId already exists in the database
      const existingStaff = await prisma.staff.findUnique({
        where: {
          cognitoId: cognitoId,
        },
      });
  
      console.log(existingStaff);
  
      // If the cognitoId exists, return a 400 status with a message
      if (existingStaff) {
        res.status(400).json({ message: "Staff with this Cognito ID already exists" });
      }
  
      // Proceed to create the staff if cognitoId is unique
      const staff = await prisma.staff.create({
        data: {
          cognitoId: cognitoId,
          name: name,
          address: address,
          phone: phone,
          email: email,
          username: username,
        },
      });
  
      console.log(staff)
      // Send back the created staff object as the response
      res.status(201).json(staff);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Error creating staff" });
    }
  };
  

  export const getStaffController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { cognitoId } = req.params; 
      const staff = await prisma.staff.findUnique(
        {where:{cognitoId:cognitoId}}
      );
      res.json(staff)
    } catch (error) {
      res.status(500).json({ message: "Error retrieving staff" });
    }
  };

  export const updateStaffController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params; 
      const { name,address,sex,phone } = req.body; 
      const updatedStaff = await prisma.staff.update({
        where: { id: id }, 
        data: { name:name.trim(),
          address:address,
          sex:sex,
          phone:phone
         }, 
      });
  
      res.status(200).json(updatedStaff);
    } catch (error) {
      res.status(500).json({ message: "Error updating staff" });
    }
  };