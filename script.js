// submit and delete functionality
document.querySelector('#book-submit')
  .addEventListener('click', () => {

    // Add a new book from form values
    libraryMechanics.addBook();
    //  Event listener to remove books created by add()
    libraryMechanics.removeBook();
    // Reset data-log attribute values
    libraryMechanics.resetLog();
    // Mark book has been read
    libraryMechanics.hasReadBook()
    // Hide form
    libraryMechanics.makeHidden()
  });

// Show new book form
document.querySelector('.add-book').addEventListener('click', () => {
  document.querySelector('.formContainer').classList.toggle('hidden')
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})


const libraryMechanics = (() => {

  let book_list = document.querySelector('.testSection')
  let myLibrary = []

  // Constructor
  class Book {
    constructor(title, subtitle, author, pages) {
      this.title = title
      this.subTitle = subtitle
      this.author = author
      this.pages = pages
    }
  }

  // Reset data-log values
  const resetLog = () => {

    let get_books = document.querySelectorAll('.book')
    for (let i = 0; i < get_books.length; i++) {
      get_books[i].setAttribute('data-log', i)
    }
  }

  // Add a book
  const addBook = () => {

    // field values
    let [title, subtitle, author, pages] = [
      document.querySelector('#book-title').value,
      document.querySelector('#book-subtitle').value,
      document.querySelector('#book-author').value,
      document.querySelector('#book-pages').value,
    ]

    //check for empty form
    if (!title || !author || !pages) {
      return alert('Please complete entire form');
    }

    // Add new book to myLibrary
    const new_book = new Book(title, subtitle, author, pages)
    myLibrary.push(new_book)
    //console.log(new_book)
    //console.log(myLibrary.length)
    
    // Create elements
    const new_book_el = document.createElement('div')
    new_book_el.setAttribute('data-log', (myLibrary.length - 1))
    new_book_el.setAttribute('class', 'book')

    const book_info_el = document.createElement('div')
    book_info_el.setAttribute('class', 'bookInfoContainer')

    const book_info_title_el = document.createElement('h2')
    const book_info_txt_el = document.createElement('p')
    book_info_txt_el.setAttribute('class', 'bookTxt')

    const btn_box_el = document.createElement('div')
    btn_box_el.setAttribute('class', 'buttonContainer')

    const delete_btn_el = document.createElement('button')
    delete_btn_el.setAttribute('class', 'deleteBtn')

    const read_btn_el = document.createElement('button')
    read_btn_el.setAttribute('class', 'readBtn')

    //Append all
    book_list.appendChild(new_book_el)
    new_book_el.appendChild(book_info_el)
    book_info_el.appendChild(book_info_title_el)
    book_info_el.appendChild(book_info_txt_el)
    book_info_el.appendChild(read_btn_el)
    new_book_el.appendChild(btn_box_el)
    btn_box_el.appendChild(delete_btn_el)

    // Format new book info
    delete_btn_el.innerText = `\u2718`
    read_btn_el.innerText = 'Read?'
    book_info_title_el.innerText = title
    book_info_txt_el.innerText = `Subtitle: ${subtitle}\n By: ${author}\n # of Pages: ${pages}`
  
    // Reset field values
      document.querySelector('#book-title').value = ''
      document.querySelector('#book-subtitle').value = ''
      document.querySelector('#book-author').value = ''
      document.querySelector('#book-pages').value= ''
  
  }

  // Remove a book
  const removeBook = () => {
    let delete_btn = book_list.getElementsByClassName('deleteBtn')
    for (let i = 0; i < delete_btn.length; i++) {

      delete_btn[i].addEventListener('click', (btn) => {
        myLibrary.splice(i, 1)
        resetLog()
        btn.target.parentNode.parentNode.remove()
      });
    }
  }

  // Mark Read
  const hasReadBook = () => {
    let read_btn = book_list.getElementsByClassName('readBtn')
    for (let i = 0; i < read_btn.length; i++) {

      read_btn[i].addEventListener('click', (btn) => {
        console.log(myLibrary[i])
        btn.target.parentNode.parentNode.style.border = 'solid .2rem #00FF2A'
        btn.target.setAttribute('id', 'hasRead')
        btn.target.innerText = `\u2713 Read!`
      });
    }
  }

  // make form hidden
  const makeHidden = () => {
    document.querySelector('.formContainer')
      .classList.toggle('hidden')
  }



  return {

    addBook,
    removeBook,
    resetLog,
    hasReadBook,
    makeHidden,

  }
})()


// Testing of alternate method for deletion of books
//
// let test =  myLibrary.map(({title,author,pages}) => { return pages}).filter(item => item == '4')
//      console.log(test) 


