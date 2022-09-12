# Airport Digital Twin Deployment



[![FIWARE](https://img.shields.io/badge/FIWARE-Orion-ff7059.svg)](https://fiware-orion.readthedocs.io/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://docs.docker.com/compose/)

A digital twin deployment for airport operations management, leveraging FIWARE Orion Context Broker, Apache NiFi/Draco for data processing, and real-time web visualization.

If you use or base your work on this project, please cite the following article:

```
@article{CONDE2022101723,
title = {Applying digital twins for the management of information in turnaround event operations in commercial airports},
journal = {Advanced Engineering Informatics},
volume = {54},
pages = {101723},
year = {2022},
issn = {1474-0346},
doi = {https://doi.org/10.1016/j.aei.2022.101723},
url = {https://www.sciencedirect.com/science/article/pii/S1474034622001811},
author = {Javier Conde and Andres Munoz-Arcentales and Mario Romero and Javier Rojo and Joaquín Salvachúa and Gabriel Huecas and Álvaro Alonso},
keywords = {Aviation, Flight turnaround events, Digital twin, Internet of Things, Data modelling, Big data},
}
```

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [FAIR Principles Compliance](#fair-principles-compliance)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Data Models](#data-models)
- [Components](#components)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Citation](#citation)
- [Support](#support)

## Overview

This project implements a digital twin infrastructure for airport operations, providing real-time data integration, processing, and visualization capabilities. It integrates multiple data sources including flight information, turnaround events, and aircraft data using standardized NGSI-v2 context information management.

### Key Capabilities

- Real-time flight and aircraft tracking
- Turnaround event processing
- NGSI-v2 compliant data management
- Integration with external systems (Chroma, Assaia, Firehose)
- Web-based real-time dashboard
- Automated data processing pipelines

## Features

- **Real-time Context Management**: FIWARE Orion Context Broker for managing airport entities
- **Data Processing Pipelines**: Apache NiFi/Draco with custom processors for NGSI data
- **Persistent Storage**: MongoDB for historical data
- **Web Interface**: Real-time web client with Socket.IO for live updates
- **Multi-source Integration**: Connectors for Chroma, Assaia, and Firehose systems
- **Containerized Deployment**: Full Docker Compose orchestration
- **Health Monitoring**: Built-in health checks for all services

## Architecture

```
┌─────────────────┐
│  External APIs  │
│ (Chroma/Assaia/ │
│   Firehose)     │
└────────┬────────┘
         │
         v
┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│   Draco/NiFi    │────>│ Orion Context│────>│   MongoDB    │
│  (Processing)   │     │    Broker    │     │  (Storage)   │
└─────────────────┘     └──────┬───────┘     └──────────────┘
                               │
                               v
                        ┌──────────────┐
                        │ Web Client   │
                        │ (Dashboard)  │
                        └──────────────┘
```

### Component Interaction

1. **Data Ingestion**: Draco processors fetch data from external APIs
2. **Context Management**: NGSI entities stored in Orion Context Broker
3. **Persistence**: Subscriptions trigger data storage in MongoDB
4. **Visualization**: Web client subscribes to Orion for real-time updates

## FAIR Principles Compliance

This project adheres to FAIR (Findable, Accessible, Interoperable, Reusable) principles:

### Findable
- **Unique Identifier**: GitHub repository URL
- **Rich Metadata**: Comprehensive documentation in README and code comments
- **Searchable**: Tagged with relevant keywords (FIWARE, NGSI, airport, digital twin)
- **Indexed**: Available in public GitHub repository

### Accessible
- **Open Access**: Publicly available repository
- **Standard Protocol**: HTTPS/HTTP, Docker, standard APIs
- **Authentication**: Configurable API authentication for external services
- **Long-term**: Docker images ensure reproducibility

### Interoperable
- **Standard Format**: NGSI-v2 context information format
- **Qualified References**: Uses FIWARE standard data models
- **Open APIs**: RESTful APIs following FIWARE specifications
- **Vocabularies**: OMA NGSI standard vocabulary

### Reusable
- **Clear License**: Apache 2.0 License
- **Provenance**: Version controlled with Git
- **Documentation**: Comprehensive setup and usage instructions
- **Standards**: FIWARE and OMA NGSI community standards

## Prerequisites

Before deploying this project, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
  ```bash
  docker --version
  ```

- **Docker Compose** (version 1.29 or higher)
  ```bash
  docker-compose --version
  ```

- **Bash** (for deployment scripts)

- **Access Credentials** for external systems:
  - Chroma API credentials
  - Assaia API credentials
  - Firehose connection details

### System Requirements

- **RAM**: Minimum 8GB (16GB recommended)
- **Disk Space**: Minimum 10GB free
- **Network**: Internet connection for pulling Docker images and accessing external APIs
- **OS**: Linux, macOS, or Windows with WSL2

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd arport_twin_deployment
```

### 2. Configure Environment

Copy the environment template and configure your settings:

```bash
cp .env.template .env
```

Edit the `.env` file with your specific configuration (see [Configuration](#configuration) section).

### 3. Make Scripts Executable

```bash
chmod +x deployment.sh
chmod +x scripts/*.sh
chmod +x draco/*.sh
```

## Configuration

### Environment Variables

Edit the `.env` file to configure all components:

#### Orion Context Broker
```properties
ORION_PORT=1026              # Orion API port
ORION_VERSION=2.5.0          # FIWARE Orion version
```

#### Draco/NiFi Data Processor
```properties
DRACO_VERSION=1.3.1          # Draco version
DRACO_WEB_PORT=9090          # NiFi web UI port
DRACO_PORT=5050              # Data ingestion port
```

#### MongoDB
```properties
MONGO_PORT=27018             # MongoDB port
MONGO_VERSION=3.6            # MongoDB version
MONGO_ROOT_USERNAME=root     # Admin username
MONGO_ROOT_PASSWORD=example  # Admin password (change in production!)
```

#### Web Client
```properties
WEB_CLIENT_PORT=3000         # Web dashboard port
```

#### External API Integrations

**Chroma Integration:**
```properties
CHROMA_REMOTE_URL_FLIGHT=https://your-chroma-flight-api.com
CHROMA_REMOTE_URL_AIRPORT=https://your-chroma-airport-api.com
CHROMA_REMOTE_URL_AIRLINE=https://your-chroma-airline-api.com
CHROMA_REMOTE_USERNAME=your_username
CHROMA_REMOTE_PASSWORD=your_password
CHROMA_TOKEN=your_api_token
```

**Assaia Integration:**
```properties
ASSAIA_REMOTE_URL_FLIGHT_TURN_AROUND=https://your-assaia-api.com
ASSAIA_REMOTE_USERNAME=your_username
ASSAIA_REMOTE_PASSWORD=your_password
ASSAIA_TOKEN=your_api_token
```

**Firehose Integration:**
```properties
FIREHOSE_HOSTNAME=your-firehose-host.net
FIREHOSE_PORT=55
FIREHOSE_CREDENTIALS={"username":"your_user","password":"your_pass"}
```

### Security Recommendations

⚠️ **Important**: 
- Change default MongoDB credentials in production
- Use strong passwords and API tokens
- Never commit `.env` file to version control
- Use secrets management for production deployments

## Usage

### Starting the System

**Initial Deployment** (creates containers and subscriptions):
```bash
./deployment.sh create
```

This command will:
1. Build and start all Docker containers
2. Wait for Orion Context Broker to be healthy
3. Create necessary NGSI subscriptions
4. Wait for Draco to be ready
5. Deploy NiFi data processing templates

### Managing the Deployment

**Stop containers** (preserves data):
```bash
./deployment.sh stop
```

**Restart containers** (with existing data):
```bash
./deployment.sh restart
```

**Destroy deployment** (removes all containers and data):
```bash
./deployment.sh destroy
# You will be prompted to confirm data deletion
```

### Accessing Services

Once deployed, access the following services:

| Service | URL | Description |
|---------|-----|-------------|
| **Orion Context Broker** | `http://localhost:1026` | NGSI-v2 API endpoint |
| **Draco/NiFi UI** | `http://localhost:9090/nifi` | Data processing pipeline UI |
| **Web Dashboard** | `http://localhost:3000` | Real-time visualization |
| **MongoDB** | `localhost:27018` | Database (requires auth) |

### Verifying Deployment

Check Orion version and status:
```bash
curl http://localhost:1026/version
```

Check health of all services:
```bash
docker-compose ps
```

View logs for specific service:
```bash
docker-compose logs -f orion
docker-compose logs -f draco
docker-compose logs -f web
```

## API Documentation

### Orion Context Broker (NGSI-v2)

#### Get All Entities
```bash
curl -X GET 'http://localhost:1026/v2/entities' \
  -H 'Accept: application/json'
```

#### Get Specific Entity
```bash
curl -X GET 'http://localhost:1026/v2/entities/{entity_id}' \
  -H 'Accept: application/json'
```

#### Create Entity
```bash
curl -X POST 'http://localhost:1026/v2/entities' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "Flight001",
    "type": "Flight",
    "flightNumber": {"type": "Text", "value": "AA100"},
    "status": {"type": "Text", "value": "OnTime"}
  }'
```

#### Update Entity Attributes
```bash
curl -X PATCH 'http://localhost:1026/v2/entities/{entity_id}/attrs' \
  -H 'Content-Type: application/json' \
  -d '{
    "status": {"type": "Text", "value": "Delayed"}
  }'
```

#### Query Entities
```bash
curl -X GET 'http://localhost:1026/v2/entities?type=Flight&q=status==Delayed' \
  -H 'Accept: application/json'
```

For complete NGSI-v2 API documentation, visit: [FIWARE NGSI-v2 Specification](https://fiware.github.io/specifications/ngsiv2/stable/)

### Web Client API

The web client exposes Socket.IO endpoints for real-time updates:

- **Connect**: `http://localhost:3000`
- **Events**: `flight-update`, `aircraft-update`, `turnaround-event`

## Data Models

### Flight Entity

```json
{
  "id": "Flight:AA100:2026-02-21",
  "type": "Flight",
  "flightNumber": {"type": "Text", "value": "AA100"},
  "airline": {"type": "Text", "value": "American Airlines"},
  "aircraft": {"type": "Relationship", "value": "Aircraft:N12345"},
  "origin": {"type": "Text", "value": "JFK"},
  "destination": {"type": "Text", "value": "LAX"},
  "scheduledDeparture": {"type": "DateTime", "value": "2026-02-21T10:00:00Z"},
  "actualDeparture": {"type": "DateTime", "value": "2026-02-21T10:05:00Z"},
  "status": {"type": "Text", "value": "Departed"}
}
```

### Aircraft Entity

```json
{
  "id": "Aircraft:N12345",
  "type": "Aircraft",
  "registration": {"type": "Text", "value": "N12345"},
  "model": {"type": "Text", "value": "Boeing 737-800"},
  "airline": {"type": "Text", "value": "American Airlines"}
}
```

### TurnAroundEvent Entity

```json
{
  "id": "TurnAroundEvent:001",
  "type": "TurnAroundEvent",
  "flight": {"type": "Relationship", "value": "Flight:AA100:2026-02-21"},
  "eventType": {"type": "Text", "value": "Boarding"},
  "timestamp": {"type": "DateTime", "value": "2026-02-21T09:30:00Z"},
  "status": {"type": "Text", "value": "InProgress"}
}
```

## Components

### Directory Structure

```
arport_twin_deployment/
├── deployment.sh              # Main deployment script
├── deployment.py              # Python deployment utilities
├── docker-compose.yml         # Container orchestration
├── .env.template              # Environment configuration template
├── README.md                  # This file
├── draco/                     # NiFi/Draco data processor
│   ├── Dockerfile
│   ├── runDraco.py           # Draco automation script
│   ├── processors/           # Custom NGSI processors
│   └── templates/            # NiFi flow templates
├── scripts/                   # Deployment automation
│   ├── create_subscriptions.py
│   └── wait_for_healthy.py
└── web/                       # Web client dashboard
    ├── app.js                # Express server
    ├── index.html            # Frontend
    ├── controllers/          # API controllers
    └── lib/                  # NGSI client library
```

### Draco/NiFi Templates

Located in `draco/templates/`:

- **Assaia-NGSI-Orion.xml**: Assaia turnaround event integration
- **Chroma-NGSI-Orion.xml**: Chroma flight data integration
- **Firehose-NGSI-Orion.xml**: Firehose data stream integration
- **ORION-TO-MONGO-2.xml**: Orion to MongoDB persistence
- **Delete-Flights-And-Relationships.xml**: Cleanup utilities

### Custom NiFi Processors

- `nifi-ngsi-nar-1.3.4.nar`: NGSI-v2 protocol support
- `nifi-tcp-client-nar-1.0-SNAPSHOT.nar`: TCP client for custom integrations

## Troubleshooting

### Common Issues

#### Containers fail to start

```bash
# Check container logs
docker-compose logs

# Ensure ports are not in use
lsof -i :1026  # Orion
lsof -i :9090  # Draco
lsof -i :3000  # Web client
lsof -i :27018 # MongoDB
```

#### Orion not accessible

```bash
# Check Orion health
docker-compose exec orion curl -s http://localhost:1026/version

# Restart Orion
docker-compose restart orion
```

#### Subscriptions not created

```bash
# Manually run subscription script
source scripts/create_subscriptions.sh
create_subscriptions
```

#### MongoDB connection issues

```bash
# Test MongoDB connection
docker-compose exec mongo mongo -u root -p example --eval "db.version()"

# Check MongoDB logs
docker-compose logs mongo
```

#### Draco/NiFi not loading templates

```bash
# Check Draco logs
docker-compose logs draco script-draco

# Manually upload templates via NiFi UI
# Access: http://localhost:9090/nifi
```

### Getting Help

If you encounter issues:

1. Check service logs: `docker-compose logs [service_name]`
2. Verify `.env` configuration
3. Ensure all prerequisites are met
4. Check firewall/network settings
5. Review [FIWARE Orion documentation](https://fiware-orion.readthedocs.io/)
6. Open an issue in the repository

## Contributing

We welcome contributions! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation for changes
- Ensure Docker builds succeed
- Test deployment scripts thoroughly

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on collaboration and learning

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

### Third-Party Components

- **FIWARE Orion**: [AGPL v3](https://github.com/telefonicaid/fiware-orion/blob/master/LICENSE)
- **Apache NiFi/Draco**: [Apache 2.0](https://github.com/ging/fiware-draco/blob/master/LICENSE)
- **MongoDB**: [SSPL](https://www.mongodb.com/licensing/server-side-public-license)

## Citation

If you use this project in your research or production, please cite:

```bibtex
@software{airport_digital_twin,
  title={Airport Digital Twin Deployment},
  author={Your Organization},
  year={2026},
  url={https://github.com/your-org/arport_twin_deployment},
  version={1.0.0}
}
```

### Related Publications

- FIWARE NGSI-v2 Specification: https://fiware.github.io/specifications/ngsiv2/stable/
- Digital Twin Architecture for Airports: [Add your publications]

## Support

### Documentation Resources

- [FIWARE Orion Documentation](https://fiware-orion.readthedocs.io/)
- [Apache NiFi Documentation](https://nifi.apache.org/docs.html)
- [NGSI-v2 Cookbook](https://fiware-orion.readthedocs.io/en/master/user/walkthrough_apiv2/index.html)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

### Contact

- **Issues**: [GitHub Issues](https://github.com/your-org/arport_twin_deployment/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/arport_twin_deployment/discussions)
- **Email**: support@your-organization.com

### Version Information

- **Current Version**: 1.0.0
- **Last Updated**: February 21, 2026
- **Compatibility**: Docker 20.10+, Docker Compose 1.29+

---

**Metadata**
- **Keywords**: FIWARE, NGSI, Airport, Digital Twin, IoT, Context Broker, Real-time, Docker
- **Category**: Digital Twin Infrastructure
- **Domain**: Aviation, Airport Operations
- **Standards**: NGSI-v2, OMA NGSI, FIWARE
- **Status**: Active Development
