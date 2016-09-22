<?php

session_start();

session_unset();

session_destroy();

header("Location: ../moderacao/login-form.php");
