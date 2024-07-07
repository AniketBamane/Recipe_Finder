document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (name && email && password) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').textContent = 'Sign up successful!';
    } else {
        document.getElementById('message').textContent = 'Please fill out all fields.';
    }
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    document.getElementById('message').style.color = 'green';
    document.getElementById('message').textContent = 'Signed in as ' + profile.getName();
}

