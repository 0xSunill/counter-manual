use anchor_lang::prelude::*;

declare_id!("D4EHFhaNXjqPeyqcPkY5ftsYF4ktJYwMqmXLwpZsbti9");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
