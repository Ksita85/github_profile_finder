$(document).ready(() => {
    $('#searchUser').on('keyup', (e) => {
        username = e.target.value;

        //Make request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'd577969d26a95e22797f',
                secret: '4aff1602fef6e1e521f62c668279c4321c89f3c4'
            }
        }).done((user) => {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'd577969d26a95e22797f',
                    secret: '4aff1602fef6e1e521f62c668279c4321c89f3c4',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done((repos) => {
                $.each(repos, (index, repo) => {
                    $('#repos').append(`
                        <div class='card-body'>
                            <div class='row card-header'>
                                <div class='col-md-7'>
                                <strong>${repo.name}</strong>
                                </div>
                                <div class='col-md-3'>
                                    <span class="badge bg-primary">Forks: ${repo.forks_count}</span>
                                    <span class="badge bg-warning">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge bg-success">Stars: ${repo.stargazers_count}</span>
                                </div>  
                                <div class='col-md-2'>
                                    <a target='_blank'href="${repo.html_url}" class="btn btn-sm btn-primary">Repo Page</a>
                                </div>                  
                            </div>                       
                        </div>
                    `)
                })
            });
            $('#profile').html(`
            <div class="card">
                <div class="card-header bg-primary">
                    <h3>${user.name}</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img style='width:100%' class='img-thumbnail rounded-circle mb-3' src='${user.avatar_url}'>
                            <a target='_blank'href="${user.html_url}" class="btn btn-sm btn-primary">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge bg-primary">Public Repos: ${user.public_repos}</span>
                            <span class="badge bg-warning">Public Gists: ${user.public_gists}</span>
                            <span class="badge bg-success">Followers: ${user.followers}</span>
                            <span class="badge bg-danger">Following: ${user.following}</span>
                            <br><br>
                            <ul class='list-group '>
                                <li class='list-group-item text-primary'><span class='fw-bold'>Company:</span> ${user.company}</li>
                                <li class='list-group-item text-primary'><span class='fw-bold'>Website/blog:</span> ${user.blog}</li>
                                <li class='list-group-item text-primary'><span class='fw-bold'>Location:</span> ${user.location}</li>
                                <li class='list-group-item text-primary'><span class='fw-bold'>Member Since:</span> ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class='my-2'>Latest Repos:</h3><br>
            <div id='repos'class='card'></div>
            `);
        });
    });
});