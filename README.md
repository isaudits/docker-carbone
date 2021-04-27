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