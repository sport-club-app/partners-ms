import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Contact } from "@Core/entity"
import { PartnerModel } from "./PartnerModel"

@Entity()
export class ContactModel implements Contact {
    @PrimaryGeneratedColumn()
    id: number

    @Column("bigint")
    phone: number

    @Column("text")
    address: string

    @Column("text")
    email: string

    @Column({ type: "bigint", nullable: true })
    partnerId: number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => PartnerModel, partner => partner.contacts, {
      onDelete: "CASCADE"
    })
    partner: PartnerModel;
}
