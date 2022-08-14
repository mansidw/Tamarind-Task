const multer = require('multer')
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const fs = require("fs");

let directory_name = "images";
let filenames = fs.readdirSync(directory_name);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage,fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
} })

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });


    app.post("/image",upload.array('file'),function (req, res) {
    filenames.forEach((file) => {
        cloudinary.uploader
        .upload(`./images/${file}`,{
            resource_type:"image",
            use_filename:true,
            folder:'timepass'
        })
        .then((res)=>{
            res.send({ message: res });
        })
        .catch((err)=>{
            res.send({ message: err });
        })
    });
    
    
  })

  app.get("/allimages",async (req, res)=>{
    var fin=[]
    await cloudinary.api.resources({ type: 'upload', max_results: 30 }, 
        function(error, result) {
            fin=result});
    res.send({images:fin})
  })
};