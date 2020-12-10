# carbone

Docker implementation of Carbone.io. 

https://carbone.io/

https://github.com/Ideolys/carbone

## Usage

Launch docker container:

    docker run -p 3000:3000 -it --rm isaudits/carbone

Container launches an Express web server that listens for POST requests with the following body:

    {
        template: "/path/to/template',
        json: {
            <report data passed>
        },
        options: {
            < carbone processing options, such as "convertTo: pdf" >
        }
    
    }