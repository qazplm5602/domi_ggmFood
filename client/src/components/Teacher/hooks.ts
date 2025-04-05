export function useTeacherMode() {
    const query = new URLSearchParams(location.search);
    return query.get("teacher") !== null;
}