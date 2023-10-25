import { NextResponse } from "next/server";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export async function POST(req : Request){
 try {
     const body = await req.json(); 
     const user = await currentUser();
 
     const {src, name, description, categoryId, instructions, seed} = body;

     if(!user || !user.id || !user.firstName) {
        return new NextResponse("Unauthorized", {status : 401})
     };

     if(!src || !name || !description || !categoryId || !instructions || !seed){
         return new NextResponse("Missing required fields.", {status : 400});
        }


     // TODO : Check for subscription

     const companion = await db.companion.create({
        data : {
            username : user.firstName,
            userId : user.id,
            src,
            name,
            description,
            categoryId,
            instructions,
            seed
        }
     });

     return NextResponse.json(companion, {
        status : 201
     });
     
} catch (error) {
    console.error(`[COMPANION_POST]`, error);
    return new NextResponse("Internal Error", {status : 500});
 }
}