loadIdeas();

$('.save-idea-button').on('click', function(e) {
  e.preventDefault();
  createIdea();
  clearInputs();
  $('#new-item-form').children('input').val('');
});
$('.idea-list').on('click', '.delete-button', deleteIdea);
$('.idea-list').on('click', '.upvote-button', upvote);
$('.idea-list').on('click', '.downvote-button', downvote);
$('.idea-list').on('blur', 'h2', editTitleText);
$('.idea-list').on('blur', 'p', editBodyText);
$('.search-input').on('input', searchIdeas);


function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.qualityCount = 0;
  this.id = Date.now();
}

let createIdea = () => {
  let idea = new Idea($('.idea-title-input').val(), $('.idea-body-input').val());
  storeIdea(idea);
}

let storeIdea = (idea) => {
  let JSONidea = JSON.stringify(idea);
  localStorage.setItem(idea.id, JSONidea);
  loadIdeas();
};

function loadIdeas() {
  $('.idea-list').text('');
  let keys = Object.keys(localStorage);
  for (i = 0; i < keys.length; i++) {
    let retrievedIdea = localStorage.getItem(keys[i]);
    let idea = JSON.parse(retrievedIdea);
    prependIdea(idea);
  }
};

function prependIdea(idea) {
$('.idea-list').prepend(`
      <div class="idea" id="${idea.id}" >
        <h2 aria-label="Idea title" contenteditable="true">${idea.title}</h2> 
        <img tabindex="0" role="button" aria-label="Delete idea" class="delete-button icon" src="icons/delete.svg">
        <p aria-label="Idea body" contenteditable="true">${idea.body}</p>
        <div class="vote-container">
          <div class="vote-buttons-container">
            <img tabindex="0" role="button" aria-label="Increase quality" class="upvote-button icon" src="icons/upvote.svg">
            <img tabindex="0" role="button" aria-label="Decrease quality" class="downvote-button icon" src="icons/downvote.svg">
          </div>
          <p class="idea-quality-container">quality: <span class="idea-quality">${idea.quality}</span></p>
        </div>  
        <hr>
      </div>
      `);
}

function deleteIdea() {
  let idea = getIdea($(this));
  localStorage.removeItem(idea.id);
  loadIdeas();
}

function upvote() {
  let idea = getIdea($(this));
  idea.quality === 'swill' ? idea.quality = 'plausible' : idea.quality = 'genius';
  storeIdea(idea);
  loadIdeas();
}

function downvote() {
  let idea = getIdea($(this));
  idea.quality === 'genius' ? idea.quality = 'plausible' : idea.quality = 'swill';
  storeIdea(idea);
  loadIdeas();
}

let getIdea = (newThis) => {
  let key = newThis.closest('.idea').attr('id');
  let retrievedIdea = localStorage.getItem(key);
  let idea = JSON.parse(retrievedIdea);
  return idea
}

function searchIdeas() {
  let searchValue = $(this).val().toLowerCase();
  $(".idea-list .idea").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
  });
}

let clearInputs = () => {
  $('.idea-title-input').val('');
  $('.idea-body-input').val('');
}

function editTitleText() {
  let idea = getIdea($(this));
  idea.title = $(this).text();
  storeIdea(idea);
  loadIdeas();
};

function editBodyText() {
  let idea = getIdea($(this));
  idea.body = $(this).text();
  storeIdea(idea);
  loadIdeas();
};


