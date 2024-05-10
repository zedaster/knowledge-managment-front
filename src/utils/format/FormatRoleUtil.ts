import type {Role} from "@/models/user/Role";

/**
 * Role names in Russian
 */
const roleNames: Record<Role, string> = {
    admin: "Администратор",
    writer: "Редактор",
    reader: "Читатель"
};

/**
 * Utils to transfer role to a string
 */
export class FormatRoleUtil {
    /**
     * Shows title of the role ("admin" => "Администратор")
     * @param role The role
     */
    stringifyRole(role: Role): string {
        return roleNames[role];
    }

    /**
     * Get object key => title of role
     */
    getRoleNames(): Record<Role, string> {
        return structuredClone(roleNames);
    }
}