mongoose = require('mongoose');
const MongoDB_URI = 'mongodb://127.0.0.1:27017/Post';

mongoose.connect(MongoDB_URI,{
})

.then(db => console.log('MongoDB Successfully Connected'))
.catch(err => console.error(err));

const PostSchema = new mongoose.Schema({
    senderEmail: String,
    path: String,
    description: String,
    visibility: String,
    date: Date
});

const PostModel = mongoose.model('Post', PostSchema);

////////////////////////////////////////////////// CONEXION CON PROCEDIMIENTOS FIND DE MONGODB /////////////////////////////////////////////////////////////////////////

///Traer todo del documento:


    const ShowPostData = async() => {
        const posts = await PostModel.find()
        console.log(posts);
    };

    const ShowPostSenderEmail = async(pSender) => {
        const posts = await PostModel.find({ senderEmail: pSender}).exec();
        return posts;
    };


    const ShowPostPath = async(pPath) => {
        const posts = await PostModel.find({path: pPath}).exec();
        console.log(posts);
    };

    const ShowPostDescription = async(pDescription) => {
        const posts = await PostModel.find({ description: pDescription}).exec();
        console.log(posts);
    };

    const ShowPostVisibility = async(pVisibility) => {
        const posts = await PostModel.find({ visibility: pVisibility}).exec();
        console.log(posts);
    };


    const ShowPostDate = async(pDate) => {
        const posts = await PostModel.find({ date: pDate}).exec();
        console.log(posts);
    };


////Traer Campos específicos del documento:


const GetPostSenderEmail = async(pId) => {
    const posts = await PostModel.find({_id: pId}).project({senderEmail: 1}).exec();
    console.log(posts);
};



const GetPostPath = async(pSender) => {
    const posts = await PostModel.find({ senderEmail: pSender}).project({path: 1}).exec();
    console.log(posts);
};


const GetPostDescription = async(pSender) => {
    const posts = await PostModel.find({senderEmail: pSender}).project({description: 1}).exec();
    console.log(posts);
};

const GetPostvisibility = async(pSender) => {
    const posts = await PostModel.find({senderEmail: pSender}).project({description: 1}).exec();
    console.log(posts);
};

const GetPostdate = async(pSender) => {
    const posts = await PostModel.find({senderEmail: pSender}).project({description: 1}).exec();
    console.log(posts);
};


////////////////////////////////////////////////// CONEXION CON PROCEDIMIENTOS INSERT DE MONGODB /////////////////////////////////////////////////////////////////////////



function getValueForNextSequence(sequenceOfName){
     
        var sequenceDoc = PostModel.findAndModify({
                query:{_id: sequenceOfName },
                update: {$inc:{sequence_value:1}},
                new:true
            });
     
          return sequenceDoc.sequence_value;
     }
    




const InsertPost = async(pSender, pPath, pDescription, pVisibility) => {
    const Post = new PostModel({

        senderEmail: pSender,
        path: pPath,
        description: pDescription,
        visibility: pVisibility,
        date: Date(),

    })

    const res = await Post.save()
    console.log(res);
}



////////////////////////////////////////////////// CONEXION CON PROCEDIMIENTOS REMOVE DE MONGODB /////////////////////////////////////////////////////////////////////////


const DeleteSpecificPost = async(pId, pSender) => {
    const posts = await PostModel.deleteOne({ _id:pId, senderEmail: pSender });
    console.log(posts);
};


const DeleteSpecificPost2= async(pSender) => {
    const posts = await PostModel.deleteOne({senderEmail: pSender });
    console.log(posts);
};



////////////////////////////////////////////////// CONEXION CON PROCEDIMIENTOS REMOVE DE MONGODB /////////////////////////////////////////////////////////////////////////

async function UpdatePostPath(pPostId, pSenderEmail, pPath) {

    const posts = await PostModel.findOneAndUpdate({ _id: pPostId, email: pSenderEmail }, { path: pPath }, { new: true });

    console.log(posts);
}

async function UpdatePostDescription(pPostId, pSenderEmail, pDescription) {

    const posts = await PostModel.findOneAndUpdate({ _id: pPostId, email: pSenderEmail }, { description: pDescription }, { new: true });

    console.log(posts);
}



//////////////////////////////////////////////////////////////////////// TEST //////////////////////////////////////////////////////////////////////////////////////////
//FindPostData('Hola');
//InsertPost('Prueba1', 'pRUEBA', 'Ronaldo2222');
//InsertPost('rony1211@hotmail.com', 'content', 'Foto de un día en la playa','11110000');
//DeleteSpecificPost2('rony1211@hotmail.com');
//UpdatePostPath('6237b8bd695e4ef099cb517a','rony1211@hotmail.com','Aqui va la nueva ruta' );
//UpdatePostDescription('6237b8bd695e4ef099cb517a','rony1211@hotmail.com','Foto de un viaje al volcán');

//ShowPostContentUrl('Prueba2');
//ShowPostData();




module.exports = {DeleteSpecificPost, DeleteSpecificPost2, GetPostPath, GetPostDescription, GetPostdate, GetPostSenderEmail, GetPostvisibility,
InsertPost,ShowPostPath,ShowPostData,ShowPostDate,ShowPostDescription,ShowPostSenderEmail, ShowPostVisibility,UpdatePostPath,UpdatePostDescription}