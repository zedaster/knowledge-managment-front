import type {EditData} from "@/models/edit/EditData";
import type {VersionData} from "@/models/edit/VersionData";
import {SecureRequestManager} from "@/api/SecureRequestManager";
import type {EditDataDto} from "@/api/dto/EditDataDto";
import config from "@/config/api.config"
import type {CommitData} from "@/models/edit/CommitData";
import type {CommitDto} from "@/api/dto/CommitDto";

export class EditArticleApi {

    /**
     * Gets edit data for an article
     * @param articleId
     */
    public async getEditData(articleId: number): Promise<EditData> {
        const dto = await new SecureRequestManager().get<EditDataDto>(config.GET_EDIT_DATA + articleId);
        return {
            title: dto.title,
            content: dto.content,
            currentVersion: dto.id_version,
            versions: dto.versions.map((v) => {
                return {
                    versionId: v.id_version,
                    createdAt: new Date(v.createdAt),
                }
            }),
        }
    }

    /**
     * Gets data for a specific version
     * @param versionId Id of the specified version
     */
    public async getCertainVersion(versionId: number): Promise<VersionData> {
        return await new SecureRequestManager().get<VersionData>(config.GET_CERTAIN_VERSION + versionId)
    }

    public async commit(data: CommitData) {
        const dto: CommitDto = {
            title: data.title,
            content: data.content,
            id_article: data.articleId,
            id_version: data.versionId
        }
        await new SecureRequestManager().post(config.COMMIT_VERSION + data.articleId, dto)
    }
}