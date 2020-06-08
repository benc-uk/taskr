List users
```
az rest -u "https://management.azure.com/subscriptions/52512f28-c6ed-403e-9569-82a9fb9fec91/resourcegroups/Live.Taskr/providers/Microsoft.Web/staticSites/taskr/authproviders/all/listUsers?api-version=2019-12-01-preview" --method post
```

Login URLS
```
https://calm-coast-062427103.azurestaticapps.net/.auth/login/aad?post_login_redirect_uri=/api/postLogin
https://calm-coast-062427103.azurestaticapps.net/.auth/login/google?post_login_redirect_uri=/api/postLogin
https://calm-coast-062427103.azurestaticapps.net/.auth/login/twitter?post_login_redirect_uri=/api/postLogin
```