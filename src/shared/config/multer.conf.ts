import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb;
    },
  }),
};
