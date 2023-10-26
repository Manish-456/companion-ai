import { NextResponse } from "next/server";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { checkSubscription } from "@/lib/subscription";

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

      const isPro = await checkSubscription();

       if(!isPro){
         return new NextResponse("Pro subscription required", {status : 403});
       }

     const companion = await db.companion.create({
        data : {
            username : user.firstName,
            userId : user.id,
            ...body
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