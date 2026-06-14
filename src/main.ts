import './style.css'
import { ProductBloc } from './01-srp/product-bloc'
import { PostService } from './05-dip/post-service'

const app = document.querySelector<HTMLDivElement>('#app')!

const productBloc = new ProductBloc()
const postService = new PostService()

app.innerHTML = `
  <h1>CleanCode y SOLID</h1>
  <span>Revisar la consola de JavaScript</span>
`

async function bootstrap() {
  // Prueba del modulo SRP sin modificar su implementacion interna.
  productBloc.saveProduct({ id: 1, name: 'Camiseta de la reserva' })
  const savedProduct = productBloc.loadProduct(1)
  productBloc.notifyCustomer('cliente@correo.com', 'Tu compra fue registrada')

  console.log('Producto recuperado:', savedProduct)

  // Prueba del modulo DIP para confirmar que el proyecto ejecuta codigo visible.
  const posts = await postService.getPosts()
  console.log('Posts cargados:', posts)
}

bootstrap()
