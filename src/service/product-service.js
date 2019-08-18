import Mutil from 'util/mm.js';

const _mm = new Mutil();

class Product {
    getProduct(productId) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data: {
                productId
            }
        })
    }
    // get return of the search data, or the whole list data
    getProductList(listParam) {
        let url = '',
            data = {};

        if (listParam.listType === 'list') {
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') {
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.searchKeyword;
        }

        return _mm.request({
            type: 'post',
            url: url,
            data: data
        })
    }
    // inform backend to change the item status
    changeProductStatus(productInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        })
    }

    /*
    *  category interface
    */
    getCategoryList(parentCategoryId) {
        return _mm.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }
    // validate submitted product data
    productResultCheck(product) {
        let result = {
            status: true,
            msg: "validate success!"
        }

        if (typeof product.productName !== 'string' || product.productName.length === 0) {
            return {
                status: false,
                msg: "Product name can not be empty!"
            }
        }
        if (typeof product.productDes !== 'string' || product.productDes.length === 0) {
            return {
                status: false,
                msg: "Product description can not be empty!"
            }
        }
        if (typeof product.currentCategoryId !== 'number' || !(product.currentCategoryId > 0) ) {
            return {
                status: false,
                msg: "Please choose the product category!"
            }
        }
        if (typeof product.productPrice !== 'number' || !(product.productPrice >= 0) ) {
            return {
                status: false,
                msg: "Please enter a valid price!"
            }
        }
        if (typeof product.stockNum !== 'number' || !(product.stockNum >= 0) ) {
            return {
                status: false,
                msg: "Please enter a valid stock number!"
            }
        }
        // if (typeof product.subImages !== 'string' || product.subImages.length === 0) {
        //     return {
        //         status: false,
        //         msg: "Product name can not be empty!"
        //     }
        // }
        // if (typeof product.detail !== 'string' || product.detail.length === 0) {
        //     return {
        //         status: false,
        //         msg: "Product name can not be empty!"
        //     }
        // }

        return result;
    }

    addProductSubmit(product) {
        if (product.id) {
            return _mm.request({
                type: 'post',
                url: '/manage/product/save.do',
                data: {
                    name: product.productName,
                    subtitle: product.productDes,
                    categoryId: product.currentCategoryId,
                    price: product.productPrice,
                    stock: product.stockNum,
                    subImages: product.subImages,
                    detail: product.detail,
                    status: product.status,
                    id: product.id
                }
            });
        }
        return _mm.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: {
                name: product.productName,
                subtitle: product.productDes,
                categoryId: product.currentCategoryId,
                price: product.productPrice,
                stock: product.stockNum,
                subImages: product.subImages,
                detail: product.detail,
                status: product.status
            }
        });
    }
}

export default Product;
