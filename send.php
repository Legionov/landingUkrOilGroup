<?php
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$city = $_POST['city'];
$tel = $_POST['tel'];
$bldngnumber = $_POST['bldngnumber'];
$email = $_POST['email'];
$fueltype = $_POST['eurodieselid'];
$transporttype = $_POST['transporttype'];
$fueltype = $_POST['fueltype'];
$gasstation = $_POST['gasstation'];
$pricecoef = $_POST['pricecoef'];
$gasquan = $_POST['gasquan'];
$gassumm = $_POST['gassumm'];


$body = "
Тип топлива: $fueltype
Тип транспорта: $transporttype
Заправка: $gasstation
Цена за литр: $pricecoef
Количество литров: $gasquan
Сумма заказа: $gassumm
Имя: $firstName
Фамилия: $lastName
Город: $city
Отделение НП: $bldngnumber
Телефон: $tel
Почта: $email

";
$login    = 'ukroilgroupbusiness@gmail.com
'; // замените test@gmail.com на адрес электронной почты, с которого производится отправка (поскольку логин совпадает с адресом отправителя - данная переменная используется и как логин, и как адрес отправителя)
$password = 'xr3da80045oy23'; // замените password на пароль от почтового ящика, с которого производится отправка
$to       = 'ukroilgroupbusiness@gmail.com'; // замените to@example.com на адрес электронной почты получателя письма
 
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\SMTP; 
use PHPMailer\PHPMailer\Exception;
require_once __DIR__ . '/phpmailer/Exception.php'; 
require_once __DIR__ . '/phpmailer/PHPMailer.php'; 
require_once __DIR__ . '/phpmailer/SMTP.php';
 
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->Username = $login;
    $mail->Password = $password;
    $mail->setFrom($login, 'Ukr Oil Group');
    $mail->addAddress($to);
    $mail->addReplyTo($login, 'Hosting Ukraine user');
    $mail->Subject = "Заявка с сайта Ukr Oil Group на $fueltype в количестве $quantity";
    $mail->Body = $body;
    $mail->send();
    header("Location: /success.html");
    exit;
} catch (Exception $e) {
    echo "Error in sending email. Mailer Error: {$mail->ErrorInfo}";
} finally {
    $mail->smtpClose();
}