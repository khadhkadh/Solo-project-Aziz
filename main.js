/*class*/
function MakeLibrary(name) {
  return {
    name,
    list: [],
    makeBook: makeBook,
    displayItems,
    sortByPrice,
    // sortByDate,
  };
}
/*id generator*/
function generateID() {
  var count = 0;
  return function () {
    return count++;
  };
}

var id = generateID();

/** factory function */
function makeBook(title,author,genre,description,image,rating,price)  {
  var book = {
    title,
        author,
        genre,
        description,
        image,
        rating,
        price,
        id:id()

  };
  this.list.push(book);
  return book;
}
/**initiating the class */
var kkLib = MakeLibrary("kk Library");

/**creating book using our factory function */
kkLib.makeBook("The Subtle Art of Not Giving a F*ck","Mark Manson","Self-help","The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life is a 2016 nonfiction self-help book by American blogger and author Mark Manson",
["./img/book1.jfif","./img/auth1.jfif"],4.5,13.66)


kkLib.makeBook("The Little Prince"," Antoine de Saint-Exupéry","Fable",
"A pilot crashes in the Sahara Desert and encounters a strange young boy who calls himself the Little Prince. The Little Prince has traveled there from his home on a lonely, distant asteroid with a single rose. The story that follows is a beautiful and at times heartbreaking meditation on human nature."
,["./img/book2.jfif","./img/auth2.jpg"],4.8,10.49)

kkLib.makeBook("To Kill a Mockingbird","Harper Lee","Novel",
"As a Southern Gothic novel and Bildungsroman, the primary themes of To Kill a Mockingbird involve racial injustice and the destruction of innocence.",["./img/book3.jfif","./img/auth3.jfif"]
,4.3,8.89)
kkLib.makeBook("The Hunger Games","Suzanne Collins","Novel",
"In a post-apocalyptic future, life has turned extremely hard. Fighting poverty and hunger every day, sixteen years old hunter Katniss does absolutely everything in her power to have enough for her defenseless little sister, and a barely lucid mother. Life is hard, yet not impossible, until the one fateful day arrives.",
["./img/book4.jfif","./img/auth4.jfif"],4.7,12.79)


function display(book) {
  var id = book.id;
  $("#library").append(`
  <div class = book id = book${id}>
  <h2 class = title id =title${id}>${book.title}</h2>
  <img class="image" id="${id}" data-src="${book.image[0]}" data-alt="${book.image[1]}" src="${book.image[0]}" alt="${book.image[1]}" />
  <h4 class = author>${book.author}</h4>
  <h5 class = genre>${book.genre}</h5>
  <p class = description>${book.description}</p>
  <p class = price>${book.price}$</p>
  <span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>

  `)
}

/** displaying all of the items through iteration */
function displayItems() {
  $("#library").empty();
  for (var i = 0; i < this.list.length; i++) {
    console.log(this.list[i]);
    display(this.list[i]);
  }
}

kkLib.displayItems();


// sort by price 
function sortByPrice() {
  kkLib.list.sort(function (a, b) {
    return a.price - b.price;
  });

  kkLib.displayItems();
}
 $("#price").on("click", sortByPrice);




$(".image").click(function () {
  var id = this.id;
  var $image = $(this);
  var originalSrc = $image.data("src");
  var altSrc = $image.data("alt");

  if ($image.attr("src") === originalSrc) {
      $image.attr("src", altSrc);
      $image.attr("alt", originalSrc);
  } else {
      $image.attr("src", originalSrc);
      $image.attr("alt", altSrc);
  }
});

$("#submit").on("click", function () {
  var value = $("#SB").val();

  var filtered = kkLib.list.filter(function (book) {
    return book.title.toLowerCase().includes(value.toLowerCase())||book.author.toLowerCase().includes(value.toLowerCase())||book.genre.toLowerCase().includes(value.toLowerCase());
  });
  $("#library").empty();
  filtered.forEach(function (book) {
    display(book);
  });
});


// $("select").on("change", function () {
//   var value = $(this).val();
//   console.log(value);
//   var filtered = kkLib.list.filter(function (item) {
//     return item.category === value;
//   });
//   $("#shop").empty();
//   filtered.forEach(function (item) {
//     display(item);
//   });
// });


