SELECT scenario, username, password, expected_url_pattern
FROM login_credentials
WHERE active = 1;
