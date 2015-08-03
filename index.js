console.log('Plugin loaded');

setTimeout(function() {
  var products = document.querySelectorAll('.product');

  [].forEach.call(products, function(product) {
    var titleElement = product.querySelector('.title span');
    let categoryElement = product.querySelector('.category');

    // TODO: Handle 404
    fetch(
      'http://docker.tldr.is:3000/' + titleElement.innerHTML
    ).then(function(res) {
      if (res.status !== 200) {
        throw Error('Not found');
      }
      return res.json();
    }).then(function(json) {
      let ratingElement = document.createElement('a');
      ratingElement.innerHTML = json.rating;

      categoryElement.parentNode.insertBefore(
        ratingElement, categoryElement.nextSibling
      );
    }).catch(function(err) {
      let ratingElement = document.createElement('a');
      ratingElement.innerHTML = 'N/A';

      categoryElement.parentNode.insertBefore(
        ratingElement, categoryElement.nextSibling
      );
    });
  });
}, 5000);
