package aamsystemz.controller;

import aamsystemz.entity.Product;
import aamsystemz.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    //Добавить продукти
    @PostMapping(value = "/add")
    public @ResponseBody
    void addNewProduct(@RequestParam String name,
                       @RequestParam String description,
                       @RequestParam int amount) {
        Product product = new Product(0, name, description, amount);
        productRepository.save(product);
    }

    //Список всех продуктов
    @GetMapping(value = "/getall")
    public @ResponseBody
    Iterable<Product> getAllProduct() {
        return productRepository.findAll();
    }

    //редактировать продукт
    @PutMapping(value = "/update/{id}")
    public @ResponseBody void updateProduct(@PathVariable int id,
                                            @RequestParam String name,
                                            @RequestParam String description,
                                            @RequestParam int amount) {
        Product product=productRepository.findById(id).get();
        product.setName(name);
        product.setDescription(description);
        product.setAmount(amount);
        productRepository.save(product);
    }

    //Удалить продукт
    @DeleteMapping(value = "/delete/{id}")
    public @ResponseBody void deleteProduct(@PathVariable int id){
        productRepository.deleteById(id);
    }

    //Поик продукта по имени
    @GetMapping(value = "/searchByName/{name}")
    public @ResponseBody Iterable<Product> searchByName(@PathVariable String name){
        return productRepository.findByName(name);
    }


}
