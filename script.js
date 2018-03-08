var $ideaTitleInput = $('.idea-title-input');
var $ideaBodyInput = $('.idea-body-input');
var $upvoteButton = $('.upvote-button');
var $downvoteButton = $('.downvote-button');

$('.save-idea-button').on('click', function(event) {
  createIdea();
  clearInputs();
  event.preventDefault();
  $('#new-item-form').children('input').val('');
});
$('.idea-list').on('click', '.delete-button', deleteIdea);
$('.idea-list').on('click', '.upvote-button', upvote);
$('.idea-list').on('click', '.downvote-button', downvote);
$('.idea-list').on('blur', 'h2', editTitleText);
$('.idea-list').on('blur', 'p', editBodyText);

$(document).on('input', '.search-input', searchIdeas);
loadIdeas();

function Idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.qualityCount = 0;
  this.id = Date.now();
}

function createIdea() {
  var idea = new Idea($ideaTitleInput.val(), $ideaBodyInput.val(), 'swill');
  storeIdea(idea);
}

function storeIdea(idea) {
  var JSONidea = JSON.stringify(idea);
  localStorage.setItem(idea.id, JSONidea);
  loadIdeas();
};

function loadIdeas() {
  $('.idea-list').text('');
  var keys = Object.keys(localStorage);
  for (i = 0; i < keys.length; i++) {
    var retrievedIdea = localStorage.getItem(keys[i]);
    var idea = JSON.parse(retrievedIdea);
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
  $(this).closest('.idea').remove();
  storeIdeaList();
}

function getIdea(newThis) {
  var key = newThis.closest('.idea').attr('id');
  var retrievedIdea = localStorage.getItem(key);
  var idea = JSON.parse(retrievedIdea);
  return idea
}

function upvote() {
  var idea = getIdea($(this));
  if (idea.quality === 'swill') {
    idea.quality = 'plausible'
  } else {
    idea.quality = 'genius'
  }
  storeIdea(idea);
  loadIdeas();
}

function downvote() {
  var idea = getIdea($(this));
  if (idea.quality === 'genius') {
    idea.quality = 'plausible'
  } else {
    idea.quality = 'swill'
  }
  storeIdea(idea);
  loadIdeas();
}


function searchIdeas() {
  var searchValue = $(this).val().toLowerCase();
  $(".idea-list .idea").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
  });
  storeIdeaList();
}

function clearInputs() {
  $ideaTitleInput.val('');
  $ideaBodyInput.val('');
}

function editTitleText() {
  var newText = $(this).text();
  console.log($(this));
  $(this).html(`${newText}`);
  storeIdeaList();
};

function editBodyText() {
  var newText = $(this).text();
  $(this).html(`${newText}`);
  storeIdeaList();
};





// function downvote() {
//   var $qualityLevel = $(this).parentsUntil('.idea').find('.idea-quality').text();
//   if ($qualityLevel === 'genius') {
//     $(this).parentsUntil('.idea').find('.idea-quality').text('plausible');
//   } else {
//     $(this).parentsUntil('.idea').find('.idea-quality').text('swill');
//   }
//   storeIdeaList();
// };

