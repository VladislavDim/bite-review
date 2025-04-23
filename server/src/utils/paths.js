import path from 'path';
const __dirname = path.resolve();

const paths = {
    root: __dirname,
    uploads: path.join(__dirname, 'uploads'),
    data: path.join(__dirname, 'data'),
};

export default paths;
