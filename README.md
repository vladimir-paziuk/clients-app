## Migrations diagram
- https://drawsql.app/own-23/diagrams/clients-app

## AWS EC2 instance creation
- Launch instance
- Generate key pair .pem certificate for ssh access
- Assign role to instance, select instance -> security -> modify IAM role
- Provide security groups access
- Go to directory with .pem file
```bash
$ chmod 0400 {KeyPairName}.pem
$ ssh -i EC2Course.pem ec2-user@{PublicIPv4}
```

## Installation

### GIT
```bash
$ sudo yum update -y
$ sudo yum install git -y
$ git clone https://github.com/vladimir-paziuk/clients-app.git
```

### Docker
```bash
$ sudo yum search docker
$ sudo yum info docker
$ sudo yum install docker
$ sudo service docker start
```

### Docker compose
```bash
$ sudo curl -L https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

### Docker access
```bash
$ sudo usermod -a -G docker ec2-user
$ id ec2-user
```
