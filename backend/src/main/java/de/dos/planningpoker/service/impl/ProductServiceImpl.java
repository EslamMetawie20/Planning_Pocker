package de.dos.planningpoker.service.impl;

import de.dos.planningpoker.model.Product;
import de.dos.planningpoker.repository.ProductRepository;
import de.dos.planningpoker.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateById(Long id, Product product) {

        Product managedProduct = this.findById(id);
        managedProduct.setTitle(product.getTitle());
        managedProduct.setQuantity(product.getQuantity());
        managedProduct.setPrice(product.getPrice());

        return this.save(managedProduct);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

}
