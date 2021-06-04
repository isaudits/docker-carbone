# carbone

Docker implementation of Carbone.io. 

https://carbone.io/

https://github.com/Ideolys/carbone

## Usage

Test Locally:

    docker build -t docker-carbone . && docker run -it -p 3000:3000 docker-carbone

Container launches an Express web server that listens for several API:

1. POST & GET requests to `/generate` with the following body/query param:
    ```javascript
    {
        template: "/path/to/template',
        filename: "filename.pdf",
        json: {
            <report data passed>
        },
        options: {
            < carbone processing options, such as "convertTo: pdf" >
        }
    }
    ```
2. GET template to `/template` that will return you the list of template available
3. POST template to `/template` requiring Multipart Form Data containing `template` as file.

### Replace Image in Document (Alpha)

The API support image replacement with some caveats. First of all, use the following body
```
{
    template: "/path/to/template',
    filename: "filename.pdf",
    imagesReplace: [{
        source: "https://klinikpintar.id/images/banner-image-hs.png",
        destination: "word/media/image3.png"
    }],
    json: {
        <report data passed>
    },
    options: {
        < carbone processing options, such as "convertTo: pdf" >
    }
}
```

Important points:
- source must be an image URL, preferably .png
- destination is the image path in the document. To get this path unzip the document (.docx / .odt) template and look for the image you want to replace.

Caveats:
- Image dimension must be the same otherwise the new image will be scaled using the old image dimension
- Tested using docx and odt