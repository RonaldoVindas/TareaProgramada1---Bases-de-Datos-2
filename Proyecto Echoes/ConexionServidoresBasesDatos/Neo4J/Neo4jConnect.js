
const neo4j = require('neo4j-driver')

const uri = 'neo4j+s://da5da3a6.databases.neo4j.io:7687';

const user = 'neo4j';

const password = 'admin321';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session()


//const session = driver.session();
console.log('Neo4JDB Sucessfully Connected')


//Creación de Nodos


const CreateHobbie = async(pName, pDescription) =>{
    const session = driver.session();

    try{
        const result = await session.run('CREATE (h: Hobbie{name: $name, description: $description}) RETURN h',
                                        { name: pName, description: pDescription})

        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        console.log("Hobbie succesfully added")


    }catch(error){
        console.log("Error while creating node.\nError: "+ error);
    }finally{
        await session.close()
    }

     



}



const CreateInterest = async(pName, pDescription) =>{
    const session = driver.session();


    try{
    const result = await session.run('CREATE (i: Interest{name: $name, description: $description}) RETURN i',
                                    { name: pName, description: pDescription})

    const singleRecord = result.records[0]
    

    console.log("Interest succesfully added")



    }catch(error){
        console.log("Error while creating node.\nError: "+ error);
    }finally{
        await session.close()
    }

     

}


const CreateComment = async( pDescription) =>{
    const session = driver.session();

    try{

    const result = await session.run('CREATE (c: Comment{ description: $description}) RETURN c',
                                    {description: pDescription})

    const singleRecord = result.records[0]
    const node = singleRecord.get(0)

    console.log("Comment Succesfully added")


    }catch(error){
        console.log("Error while creating node.\nError: "+ error);
    }finally{
        await session.close()
    }

     
    
}


const CreateUser = async( pEmail) =>{
    const session = driver.session();
    try{
    const result = await session.run('CREATE (u: User{email: $email}) RETURN u',
                                    {email: pEmail})

    const singleRecord = result.records[0]
    const node = singleRecord.get(0)
    session.close();

    console.log("User succesfully added")
    }catch(error){
        console.log("Error inserting node.\nError: "+ error);
    }finally{
        await session.close()
    }

     

}



const CreatePost = async( pId) =>{
    const session = driver.session();
    try{
    const result = await session.run('CREATE (p: Post{id: $id}) RETURN p',
                                    {id: pId})

    const singleRecord = result.records[0]
    const node = singleRecord.get(0)
    session.close();

    console.log("Post succesfully added")
    }catch(error){
        console.log("Error inserting node.\nError: "+ error);
    }finally{
        await session.close()
    }

     

}




//Creacion de Relaciones:

const CreateUserHasHobbie = async( pUserEmail, pHobbieName) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (u:User), (h:Hobbie) WHERE u.email = $email AND h.name = $name CREATE (u)-[hs:HasHobbie]->(h) Return hs',
                                    {email: pUserEmail, name: pHobbieName })
    }catch(error){
            console.log("Error when relating Nodes.\nError: "+ error);
    }finally{
            await session.close()
    }

    // 
    
}



const CreateUserHasInterest = async( pUserEmail, pInterestName) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (u:User), (i:Interest) WHERE u.email = $email AND i.name = $name CREATE (u)-[hi:HasInterest]->(i) Return hi',
                                    {email: pUserEmail, name: pInterestName })
    }catch(error){
            console.log("Error when relating Nodes.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}


const CreatePostHasComment = async( pPostIde, pId) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (p:Post), (c:Comment) WHERE p.id = $pPostId AND ID(c) = $id CREATE (p)-[:Has]->(c)',
                                    {pPostId: pPostIde, id: pId })
    }catch(error){
            console.log("Error when relating Nodes.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}


const CreateCommentHasReplyComment = async( pCommentId1, pCommentId2) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (c: Comment), (b:Comment) WHERE ID(c) = $pComment1 AND ID(b) = $id CREATE (c)-[:HasReply]->(b)',
                                    {pComment1: pCommentId1, id: pCommentId2 })
    }catch(error){
            console.log("Error when relating Nodes.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}



const CreateUserDoComment = async( pUserEmail, pId) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (u:User), (c:Comment) WHERE u.email = $email AND ID(c) = $id CREATE (u)-[:Reply]->(c)',
                                    {email: pUserEmail, id: pId })
    }catch(error){
            console.log("Error when relating Nodes.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}





//Obtener todos los datos de Nodos

async function GetAllHobbies(){
    const session = driver.session();

    var res= {name:[]};

    try{
        const result = await session.run(
            'MATCH (h:Hobbie) RETURN h'
        )

        result.records.map( record => {
            res.name.push(record.get(0).properties.name);
            
        })
        return res;
    }catch (error){
        console.log(error);
    }finally{
        //await session.close()
    }
    // ;
    
    return res;
}




async function GetAllInterests(){
    const session = driver.session();

    var res= {name:[],description:[]};

    try{
        const result = await session.run(
            'MATCH (i:Interest) RETURN i'
        )

        result.records.map( record => {
            res.name.push(record.get(0).properties.name);
            res.description.push(record.get(0).properties.description);

        })
        console.log(res);
        return res;
    }catch (error){
        console.log(error);
    }finally{
        await session.close()
    }
     ;
    
    return res;
}


//Obtener nodo en específico
async function GetComment(pId){
    const session = driver.session();

    var res= {description:[]};

    try{
        const result = await session.run(
            'MATCH (s) WHERE ID(s) = $id RETURN s',
            {id: pId }
        )

        result.records.map( record => {
            res.description.push(record.get(0).properties.description);
        })
        console.log(res);
        return res;
    }catch (error){
        console.log(error);
    }finally{
        await session.close()
    }
     ;
    
    return res;
}



async function GetCommentFromPost(pId){
    const session = driver.session();

    var res= {description:[]};

    try{
        const result = await session.run(
            'MATCH (p: Post {id: $id})-[:Has]->(c:Comment) RETURN c',
            {id: pId }
        )

        result.records.map( record => {
            res.description.push(record.get(0).properties.description);
        })
        console.log(res);
        return res;
    }catch (error){
        console.log(error);
    }finally{
        await session.close()
    }
     ;
    
    return res;
}








async function GetUserHobbies(pEmail){
    const session = driver.session();

    var res= {name:[]};

    try{
        const result = await session.run(
            'MATCH (u: User {email: $email})-[:HasHobbie]->(h:Hobbie) RETURN h',
            {email: pEmail }
        )

        result.records.map( record => {
            res.name.push(record.get(0).properties.name);
        })
        console.log(res);
        return res;
    }catch (error){
        console.log(error);
    }finally{
        await session.close()
    }
     ;
    
    return res;
}




async function GetUserInterests(pEmail){
    const session = driver.session();

    var res= {name:[]};

    try{
        const result = await session.run(
            'MATCH (u: User {email: $email})-[:HasInterest]->(i:Interest) RETURN i',
            {email: pEmail }
        )

        result.records.map( record => {
            res.name.push(record.get(0).properties.name);
        })
        console.log(res);
        return res;
    }catch (error){
        console.log(error);
    }finally{
        await session.close()
    }
     ;
    
    return res;
}









const DeleteUser = async(pUserEmail) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (u:User {email: $email}) DETACH DELETE u', //También funciona "MATCH (u:User) WHERE u.email = $email DETACH DELETE u"
                                    {email: pUserEmail})
    }catch(error){
            console.log("Error when deleting Node.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}



const DeletePostbyLabelId = async(pPostId) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (p:Post {id: $id}) DETACH DELETE p',
                                    {id: pPostId})
    }catch(error){
            console.log("Error when deleting Node.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}





const DeletePostbyGeneratedId = async(pPostId) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (p:Post) WHERE ID(p) = $id DETACH DELETE p',
                                    {id: pPostId})
    }catch(error){
            console.log("Error when deleting Node.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}




const DeleteCommentbyGeneratedId = async(pPostId) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (c:Comment) WHERE ID(c) = $id DETACH DELETE c',
                                    {id: pPostId})
    }catch(error){
            console.log("Error when deleting Node.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}



const DeleteHobbie = async(pName) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (h: Hobbie {name: $name}) DETACH DELETE h',
                                    {name: pName})
    }catch(error){
            console.log("Error when deleting Node.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}


const DeleteInterest = async(pName) =>{
    const session = driver.session();
    try{
    const result = await session.run('MATCH (i: Interest {name: $name}) DETACH DELETE i',
                                    {name: pName})
    }catch(error){
            console.log("Error when deleting Node.\nError: "+ error);
    }finally{
            await session.close()
    }

     
    
}


module.exports = {CreateComment, CreateHobbie, CreateInterest, CreateUser, CreatePost,
                  CreateUserHasHobbie,CreateCommentHasReplyComment,CreatePostHasComment,CreateUserDoComment,CreateUserHasInterest,
                  GetAllHobbies, GetAllInterests,GetComment,GetCommentFromPost, 
                  DeleteUser, DeletePostbyLabelId, DeleteCommentbyGeneratedId, DeleteHobbie, DeleteInterest,GetUserHobbies,GetUserInterests}


///////////////////////////TEST

//CreateComment('Maradona es mejor que CR7');
//CreateUser('andrey192006@hotmail');

//CreateHobbie('Videogames', 'Play Videogames');
//CreateHobbie('Food', 'Eating Food');
//CreateHobbie('Sleep', 'Sleep all I can');
//CreateHobbie('Food', 'Eating Food');
//CreateHobbie('BasketBall', 'Play BasketBall');

//CreateInterest('Sports', 'Athlete');
//CreateInterest('Animals', 'Animal species');
//CreateInterest('Travel', 'Going Places');
//CreateInterest('Vehicles', 'Racing, Mechanic and Engines');


//CreatePost(101);
//GetCommentFromPost(1);

//CreateUserHasInterest('rony1211@gmail.com', 'Astronomía');
//CreateUserDoComment('rony1211@gmail.com',30);
//CreatePostHasComment(1,30);

//CreateCommentHasReplyComment(30,33);
//GetComment(30);
//GetAllHobbies();
//CreateUser('gallina@gmail.com')
//CreateUserHasHobbie('gallina@gmail.com', 'Videojuegos')
//
//CreateComment("Este es un comentario de prueba, puedo agregar lo que quiera");
//CreateUserDoComment('gallina@gmail.com', 15);


//DeleteHobbie('Videojuegos');
//DeleteHobbie('Soccer');
//DeleteInterest('Astronomía');
//DeleteCommentbyGeneratedId(30);
//DeletePostbyGeneratedId(38);