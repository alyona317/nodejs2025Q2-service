
set -e

echo "PostgreSQL initialization started..."


until pg_isready -U $POSTGRES_USER; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

echo "PostgreSQL is ready for connections!"