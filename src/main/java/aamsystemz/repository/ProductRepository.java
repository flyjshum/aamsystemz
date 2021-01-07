package aamsystemz.repository;

import aamsystemz.entity.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepository extends CrudRepository <Product, Integer>{
public Iterable<Product> findByName (String name);
}
