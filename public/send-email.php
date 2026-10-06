<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid JSON payload"]);
    exit();
}

$name = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : 'Customer';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : 'N/A';
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : 'N/A';
$service = isset($data['service']) ? htmlspecialchars(trim($data['service'])) : 'General Enquiry';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message'])) : 'No additional message';
$date = isset($data['date']) ? htmlspecialchars(trim($data['date'])) : date('d M Y, H:i');
$isTest = !empty($data['isTest']);

$defaultRecipients = [
    'sgs.london2015@gmail.com',
    'digitalbotsolutions@gmail.com',
    'info@shalomgsolutions.co.uk'
];

$recipients = (!empty($data['customRecipients']) && is_array($data['customRecipients']))
    ? $data['customRecipients']
    : $defaultRecipients;

$subjectPrefix = !empty($data['subjectPrefix']) ? $data['subjectPrefix'] : '🔔 New ShalomGlobal Service Enquiry';
$subject = $isTest
    ? '🧪 Test Notification from ShalomGlobal Admin Portal'
    : "{$subjectPrefix}: {$name} ({$service})";

$htmlBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #1B263B; padding: 24px 30px; text-align: left; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; }
    .badge { display: inline-block; background: " . ($isTest ? '#3182ce' : '#386641') . "; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; }
    .body { padding: 30px; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 11px; font-weight: 700; color: #718096; text-transform: uppercase; margin-bottom: 4px; }
    .field-value { font-size: 15px; font-weight: 600; color: #1a202c; }
    .message-box { background: #FAF8F3; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 20px; }
    .footer { background: #f8fafc; padding: 16px 30px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #718096; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <div class='badge'>" . ($isTest ? 'System Test' : 'New Customer Lead') . "</div>
      <h1>" . ($isTest ? 'Email System Verification' : 'ShalomGlobal Service Enquiry') . "</h1>
    </div>
    <div class='body'>
      <div class='field'>
        <div class='field-label'>Customer Name</div>
        <div class='field-value'>{$name}</div>
      </div>
      <div class='field'>
        <div class='field-label'>Service Requested</div>
        <div class='field-value' style='color: #386641;'>{$service}</div>
      </div>
      <div class='field'>
        <div class='field-label'>Phone Number</div>
        <div class='field-value'>📞 {$phone}</div>
      </div>
      <div class='field'>
        <div class='field-label'>Email Address</div>
        <div class='field-value'>✉️ {$email}</div>
      </div>
      <div class='field'>
        <div class='field-label'>Submission Date</div>
        <div class='field-value'>{$date}</div>
      </div>
      <div class='message-box'>
        <div class='field-label'>Message Details:</div>
        <p style='margin: 6px 0 0 0; font-size: 14px; color: #2d3748; line-height: 1.6; white-space: pre-wrap;'>{$message}</p>
      </div>
    </div>
    <div class='footer'>
      Delivered to: <strong>" . implode(', ', $recipients) . "</strong><br />
      Sent automatically via ShalomGlobal Website Server
    </div>
  </div>
</body>
</html>
";

// SMTP Configuration
$smtpHost = 'smtp.gmail.com';
$smtpPort = 587;
$smtpUser = 'zingbiteuk@gmail.com';
$smtpPass = 'yyozpzropaysxtah';

function sendViaSmtp($host, $port, $user, $pass, $recipients, $subject, $htmlBody, $replyTo) {
    $socket = fsockopen($host, $port, $errno, $errstr, 15);
    if (!$socket) {
        return false;
    }

    $read = fgets($socket, 515);

    fputs($socket, "EHLO " . gethostname() . "\r\n");
    $read = '';
    while ($line = fgets($socket, 515)) {
        $read .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }

    fputs($socket, "STARTTLS\r\n");
    $read = fgets($socket, 515);

    if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        fclose($socket);
        return false;
    }

    fputs($socket, "EHLO " . gethostname() . "\r\n");
    $read = '';
    while ($line = fgets($socket, 515)) {
        $read .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }

    fputs($socket, "AUTH LOGIN\r\n");
    $read = fgets($socket, 515);

    fputs($socket, base64_encode($user) . "\r\n");
    $read = fgets($socket, 515);

    fputs($socket, base64_encode($pass) . "\r\n");
    $read = fgets($socket, 515);

    if (substr($read, 0, 3) !== '235') {
        fclose($socket);
        return false;
    }

    fputs($socket, "MAIL FROM:<{$user}>\r\n");
    $read = fgets($socket, 515);

    foreach ($recipients as $to) {
        fputs($socket, "RCPT TO:<{$to}>\r\n");
        $read = fgets($socket, 515);
    }

    fputs($socket, "DATA\r\n");
    $read = fgets($socket, 515);

    $headers = "From: =?UTF-8?B?" . base64_encode("ShalomGlobal Service Enquiry") . "?= <{$user}>\r\n";
    $headers .= "To: " . implode(', ', $recipients) . "\r\n";
    $headers .= "Reply-To: {$replyTo}\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: base64\r\n";

    $mailData = $headers . "\r\n" . chunk_split(base64_encode($htmlBody)) . "\r\n.\r\n";
    fputs($socket, $mailData);
    $read = fgets($socket, 515);

    fputs($socket, "QUIT\r\n");
    fclose($socket);

    return (substr($read, 0, 3) === '250');
}

$sent = sendViaSmtp($smtpHost, $smtpPort, $smtpUser, $smtpPass, $recipients, $subject, $htmlBody, $email);

if (!$sent) {
    // Fallback to PHP native mail()
    $toHeader = implode(', ', $recipients);
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: ShalomGlobal Service Enquiry <info@shalomgsolutions.co.uk>" . "\r\n";
    if ($email !== 'N/A') {
        $headers .= "Reply-To: " . $email . "\r\n";
    }
    $sent = @mail($toHeader, $subject, $htmlBody, $headers);
}

if ($sent) {
    echo json_encode([
        "success" => true,
        "message" => "Email notification successfully dispatched",
        "recipients" => $recipients
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Failed to deliver email notification via SMTP and server mail."
    ]);
}
