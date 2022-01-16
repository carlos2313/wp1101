import {parse, join} from "path"; // This is node built in package
import {createWriteStream} from "fs"; // this is node built in package
import extract from 'extract-zip';
import path from 'path';
import fs from 'fs';
import {enqueue} from '../index';
import symlinkDir from 'symlink-dir';

const unzip = async (source, target) => {
    try {
        await extract(source, { dir: target })
        console.log('Extraction complete')
    } catch (err) {
        console.log(err)
    }
}

const readFile = async (file, username, exam) => {
    const {createReadStream, filename} = await file;
    const stream = createReadStream();
    var {ext, name} = parse(filename);
    name = `single${Math.floor((Math.random() * 10000) + 1)}`;
    const now = Date.now();
    let url = join(__dirname, `../Upload/${username}-${exam}-${now}${ext}`);
    const fileStream = await createWriteStream(url)
    const test = await stream.pipe(fileStream);
    const baseUrl = process.env.BASE_URL
    const port = process.env.PORT

    if(ext === '.zip'){
        const desPath = path.resolve(`./Upload/${username}-${exam}-${now}`);
        const tmp = url;
        test.on('finish', async function(){
            await unzip(tmp, desPath);
        })
    }
    const filePath = `${username}-${exam}-${now}`
    const nodeModulePath = path.resolve('./node_modules');
    const symlinkPath = path.resolve('./Upload/'+ filePath +'/hack2/node_modules')
    
    symlinkDir(nodeModulePath, symlinkPath)
    .then(result => {
        console.log(result)
        //> { reused: false }
        return symlinkDir(nodeModulePath, symlinkPath)
    })
    .then(result => {
        console.log(result)
        //> { reused: true }
    })
    .catch(err => console.error(err))
    
    const fileUrl = `${baseUrl}${port}${url.split('Upload')[1]}`;
    
    enqueue(filePath);
    return { fileUrl, filePath };
} // This is single readfile

const multipleReadFile = async (file) => {
    let fileUrl = [];
    for (let i = 0; i < file.length; i++) {
        const {createReadStream, filename} = await file[i];
        const stream = createReadStream();
        var {ext, name} = parse(filename);
        name = `single${Math.floor((Math.random() * 10000) + 1)}`;
        let url = join(__dirname, `../Upload/${name}-${Date.now()}${ext}`);
        const imageStream = await createWriteStream(url)
        await stream.pipe(imageStream);
        const baseUrl = process.env.BASE_URL
        const port = process.env.PORT
        url = `${baseUrl}${port}${url.split('Upload')[1]}`;
        fileUrl.push({url});
    }
    return fileUrl
}

export {readFile, multipleReadFile}