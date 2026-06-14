import './style.css'
import { ProductBloc } from './01-srp/product-bloc'
import { NewsService, PhotosService } from './02-ocp/news-service'
import { Audi, Ford, Honda, Tesla, Toyota, VehicleManager } from './03-lsp/vehicle-manager'
import { BirdCatalog, Hummingbird, Ostrich, Toucan } from './04-isp/bird-catalog'
import { LocalDatabaseService } from './data/local-database'
import { PostService } from './05-dip/post-service'

const app = document.querySelector<HTMLDivElement>('#app')!

const productBloc = new ProductBloc()
const newsService = new NewsService()
const photosService = new PhotosService()
const postService = new PostService(new LocalDatabaseService())
const vehicles = [
  new Tesla('Model X'),
  new Audi('A4'),
  new Toyota('Prius'),
  new Honda('Civic'),
  new Ford('Ranger'),
]
const toucan = new Toucan()
const hummingbird = new Hummingbird()
const ostrich = new Ostrich()

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

  // Prueba del modulo OCP manteniendo la misma funcionalidad observable.
  const news = await newsService.getLatestNews()
  const gallery = await photosService.getGallery()

  console.log('Noticias cargadas:', news.slice(0, 2))
  console.log('Galeria cargada:', gallery.slice(0, 2))

  // Prueba del modulo LSP tratando todos los vehiculos por el mismo contrato.
  VehicleManager.printVehicleDetails(vehicles)

  // Prueba del modulo ISP usando contratos pequenos segun la capacidad de cada ave.
  BirdCatalog.showEating([toucan, hummingbird, ostrich])
  BirdCatalog.showFlying([toucan, hummingbird])
  BirdCatalog.showSwimming([ostrich])

  // Prueba del modulo DIP para confirmar que el proyecto ejecuta codigo visible.
  const posts = await postService.getPosts()
  console.log('Posts cargados:', posts)
}

bootstrap()
