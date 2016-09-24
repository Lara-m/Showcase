<!DOCTYPE HTML>  
<html>
	<head>
	<link rel="stylesheet" type="text/css" href="style.css">
		<style>
			.error {color: #FF0000;}
		</style>
	</head>
<body>  

<?php
	$nameErr = $emailErr = "";
	$name = $email = $comment = "";
	$sh = "none";

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (empty($_POST["name"])) {
			$nameErr = "Name is required";
		} else {
			$name = test_input($_POST["name"]);
			if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
				$nameErr = "Only letters and white space allowed"; 
			}
		}

		if (empty($_POST["email"])) {
			$emailErr = "Email is required";
		} else {
			$email = test_input($_POST["email"]);
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$emailErr = "Invalid email format"; 
			}
		}
		if (empty($_POST["comment"])) {
			$comment = "";
		} else {
			$comment = test_input($_POST["comment"]);
		}
		if (empty($nameErr) && empty($emailErr)) {
			$sh = "block";
		}
	}

	function test_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
?>

<h2>Feedback</h2>
<p><span class="error">* required field.</span></p>
<form method="post" autocomplete="off" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
	Name: <input type="text" name="name">
	<span class="error">* <?php echo $nameErr;?></span>
	<br><br>
	E-mail: <input type="text" name="email">
	<span class="error">* <?php echo $emailErr;?></span>
	<br><br>
	Comment: <textarea name="comment" rows="5" cols="40"></textarea>
	<br><br>
	<input type="submit" name="submit" value="Submit">  
</form>

<div style="display: <?php echo $sh?>">
	<span><?php 
		echo "<h2>Thank you for visiting!</h2>";
		echo "Dear ";?></span>
	<span><?php echo $name;?></span>
	<span><?php 
		echo ",<br><br>";
		echo "You have entered the following information:<br>";
		echo "<br>Email: ";
	?></span>
	<span><?php echo $email;?></span>
	<span><?php echo "<br>Comment: ";?></span>
	<span><?php echo $comment;?></span>

</div>
</body>
</html>