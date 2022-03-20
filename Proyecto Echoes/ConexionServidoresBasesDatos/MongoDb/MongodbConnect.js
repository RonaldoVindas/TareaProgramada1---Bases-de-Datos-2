mongoose = require('mongoose');
const MongoDB_URI = 'mongodb://127.0.0.1:27017/Post';

mongoose.connect(MongoDB_URI,{

})
.then(db => console.log('MongoDB se ha conectado'))
.catch(err => console.error(err));

const PostSchema = new mongoose.Schema({
    senderEmail: String,
    contentURL: String,
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
        console.log(posts);
    };


    const ShowPostContentUrl = async(pContent) => {
        const posts = await PostModel.find({ contentURL: pContent}).exec();
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


const GetPostsenderemail = async(pId) => {
    const posts = await PostModel.find({_id: pId}).project({senderEmail: 1}).exec();
    console.log(posts);
};



const GetPostContentUrl = async(pSender) => {
    const posts = await PostModel.find({ senderEmail: pSender}).project({contentURL: 1}).exec();
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
    





const InsertPost = async(pSender, pContent, pDescription, pVisibility) => {
    const Post = new PostModel({

        senderEmail: pSender,
        contentURL: pContent,
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

//////////////////////////////////////////////////////////////////////// TEST //////////////////////////////////////////////////////////////////////////////////////////
//FindPostData('Hola');
//InsertPost('Prueba1', 'pRUEBA', 'Ronaldo2222');
//InsertPost('rony1211@hotmail.com', 'content', 'una descripcion','11110000');
DeleteSpecificPost2('rony1211@hotmail.com');


//ShowPostContentUrl('Prueba2');
//ShowPostData();
