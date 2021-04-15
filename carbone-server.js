const carbone = require("carbone");
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require(`multer`);
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

const apiKeyMiddleware = function (req, res, next) {
  if (req.header("key") === process.env.KEY) {
    next();
  } else {
    throw new Error("API Key mismatch!");
  }
};
app.use(apiKeyMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", async (req, res) => {
  res.send("Welcome to Carbone Server");
});

app.get("/template", async (req, res) => {
  const files = await fs.promises.readdir(`./templates`);
  res.send(files);
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./templates");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./templates");
  },
  filename(req, file = {}, cb) {
    const { originalname } = file;
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
    cb(null, `${originalname.trim()}__${Date.now()}${fileExtension}`);
  },
});
const upload = multer({ storage: storage });
app.post("/template", upload.single(`template`), async (req, res) => {
  res.send("Template Uploaded!");
});

app.post("/", async (req, res) => {
  template = req.body.template;
  filename = template.replace(/^.*[\\\/]/, ""); //extract template filename to use as download file name
  data = req.body.json;
  options = req.body.options;

  if (options.convertTo) {
    filename = filename.replace(/\.[^/.]+$/, ""); //change filename extension of converted (ie to PDF)
    filename = filename + "." + options.convertTo;
  }

  carbone.render(template, data, options, async (err, result) => {
    if (err) {
      return console.log(err);
    }
    await fs.promises.writeFile(filename, result);
    
    res.setHeader("Content-Length", result.length);
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="' + filename + '";'
    );
    res.send(result);
  });
});