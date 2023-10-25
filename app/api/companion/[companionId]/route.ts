import { NextResponse } from "next/server";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export async function PATCH(req : Request, {params} : {
    params : {
        companionId : string
    }
}){
 try {
    const {companionId} = params;
     const body = await req.json(); 
     const user = await currentUser();
 
     const {src, name, description, categoryId, instructions, seed} = body;

     if(!user || !user.id || !user.firstName) {
        return new NextResponse("Unauthorized", {status : 401})
     };

     if(!companionId) return new NextResponse("Companion ID required", {status : 400})

     if(!src || !name || !description || !categoryId || !instructions || !seed){
         return new NextResponse("Missing required fields.", {status : 400});
        }


     // TODO : Check for subscription

     const companion = await db.companion.update({
        where : {
         id : companionId,
         userId : user.id
        },
        data : {
            userId :user.id,
            username : user.firstName,
            src,
            name,
            description,
            categoryId,
            instructions,
            seed
        }
     });

     return NextResponse.json(companion, {
        status : 200
     });
     
} catch (error) {
    console.error(`[COMPANION_PATCH]`, error);
    return new NextResponse("Internal Error", {status : 500});
 }
}