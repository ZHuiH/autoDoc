import {defineConfig} from "vite"

export default defineConfig({
    css:{
        preprocessorOptions:{
            less:{
                javascriptEnabled:true
            }
        }
    },
    server:{
        host:"0.0.0.0",
        port:3333,
        open:false
    }
});