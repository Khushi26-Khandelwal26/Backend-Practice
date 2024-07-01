import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname) 
      /*
      waise originalname prefer nhi krte since user
      same naam se multiple files bhejskta h that could create problem
      but ye thodi time ke liye hi rahegi disk pr
      fir ye cloud pr chli jaayegi
      */
    }
  })
  
export const upload = multer({ storage })